import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body
    const user = req.user

    if(!content){
        throw new ApiError(401, "Content required for tweet")
    }

    if(!user){
        throw new ApiError(400, "Unauthorized request to create tweet")
    }

    const tweet = await Tweet.create({
        content,
        owner: user?._id
    })

    

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweet, "Tweet created successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    //get user ID and then get tweets by findbyID
    const { userId } = req.params

    if(!userId){
        throw new ApiError(400, "User ID is missing")
    }

    const tweets = await Tweet.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project:{
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        }
    ])

    if(!tweets?.length){
        throw new ApiError(400, "Tweet does not exist")
    }

    return res
    .status(200)
    .json(200, tweets[0], "User Tweets fetched successfully")
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params
    const {content} = req.body

    if(!tweetId){
        throw new ApiError(400, "Tweet ID is missing")
    }

    if(!content){
        throw new ApiError(400, "Tweet is missing")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set:{
                content,
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweet, "Tweet updated successfully")
    )

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params

    if(!tweetId){
        throw new ApiError(400, "Tweet ID is not valid")
    }
    await Tweet.findByIdAndDelete(tweetId)

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Tweet deleted successfully")
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
