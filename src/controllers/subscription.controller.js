import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const user = req.user
    // TODO: toggle subscription 
    // get user id and check if user exist in channel
    const channel = await User.findById(channelId)

    if(!user){
        throw new ApiError(400, "User not found")
    }

    if(!channel){
        throw new ApiError(400, "Channel not found")
    }

    const subsribers = await Subscription.find(
        {
            subsriber: user._id,
            channel: channel._id
        }
    )

    let isSubscribed = false;

    if(subsribers.length >0){
        isSubscribed = true;
        await Subscription.deleteOne({
            subsriber: user._id,
            channel: channel._id
        })
    } else{
        isSubscribed = false;
        await Subscription.create({
            subsriber: user._id,
            channel: channel._id
        })
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, `Channel ${isSubscribed ? "unsubscribed" : "subscribed"} successfully`)
    )

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    const channel = await User.findById(channelId)

    if(!channelId){
        throw new ApiError(400, "Channel ID not found")
    }
    if(!channel){
        throw new ApiError(400, "Channel not found")
    }

    const subsribers = await Subscription.aggregate([
        {
            $match:{
                channel: channel._id
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "subsriber",
                foreignField: "_id",
                as: "subscriber",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                subscriber: {
                    $first: "$subscriber"
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, subsribers, "Subscriber list fetched successfully")
    )

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    const subscriber = await User.findById(subscriberId)

    if(!subscriberId){
        throw new ApiError(400, "Subscriber ID not found")
    }
    if(!subscriber){
        throw new ApiError(400, "Subscriber not found")
    }


    const subscribedChannels = await Subscription.aggregate([
        {
            $match:{
                subsriber: subscriber._id
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                channel: {
                    $first: "$channel"
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribedChannels, "Subscribed Channels list fetched successfully")
    )

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}