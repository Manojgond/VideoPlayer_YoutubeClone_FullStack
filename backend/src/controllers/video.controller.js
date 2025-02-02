import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType } = req.query
    const user = req.user
    if (!user) {
        throw new ApiError(400, "User does not exist")
    }

    try {
        const sortOrder = sortType === 'asc' ? 1 : -1;

        const videos = await Video.find({ ...query })
            .sort({ [sortBy]: sortOrder })
            .populate('owner');

        const totalCount = await Video.countDocuments({ ...query });

        const userVideos = {
            videos,
            totalCount
        };

        return res
            .status(200)
            .json(
                new ApiResponse(200, userVideos, "All videos fetched successfully")
            )

    } catch (error) {
        console.error(error);
        throw error;
    }
})

const getCurrentUserVideos = asyncHandler(async (req, res) => {
    const { query, sortBy, sortType } = req.query
    const user = req.user
    if (!user) {
        throw new ApiError(400, "User does not exist")
    }
    const userId = user._id;

    try {
        const sortOrder = sortType === 'asc' ? 1 : -1;
        const videos = await Video.find({ owner: userId, ...query })
            .sort({ [sortBy]: sortOrder })
            .populate('owner');

        const totalCount = await Video.countDocuments({ owner: userId, ...query });
        const userVideos = {
            videos,
            totalCount
        };
        return res
            .status(200)
            .json(
                new ApiResponse(200, userVideos, "User's all videos fetched successfully")
            )
    } catch (error) {
        console.error(error);
        throw error;
    }
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    if (!title || !description) {
        throw new ApiError(400, "Title and description required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new ApiError(400, "Video and Thumbnail is required")
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!video || !thumbnail) {
        throw new ApiError(400, "Video or thumbnail missing, Someting went wrong while uploading")
    }

    const publishedVideo = await Video.create(
        {
            videoFile: video.url,
            thumbnail: thumbnail.url,
            title,
            description,
            duration: video.duration,
            isPublished: true,
            owner: req.user?._id
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, publishedVideo, "Video published successfully")
        )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const user = req.user;

    if (!videoId) {
        throw new ApiError(400, "Video ID not found")
    }

    if (!user) {
        return { error: "User not found" };
    }

    // Increment video views by one
    await Video.findByIdAndUpdate(
        videoId,
        {
            $inc: {
                views: 1
            }
        }
    )

    // Add videoId to user's Watchhistory
    user.watchHistory = user.watchHistory.filter(video => !video.equals(videoId))
    user.watchHistory.unshift(videoId)

    await user.save();


    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribers"
                        }
                    },
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "subscriber",
                            as: "subscribedTo"
                        }
                    },
                    {
                        $addFields: {
                            subscribersCount: {
                                $size: "$subscribers"
                            },
                            channelsSubscribedToCount: {
                                $size: "$subscribedTo"
                            },
                            isSubscribed: {
                                $cond: {
                                    if: {
                                        $gt: [
                                            {
                                                $size: {
                                                    $filter: {
                                                        input: "$subscribers",
                                                        as: "subscriber",
                                                        cond: { $eq: ["$$subscriber.subscriber", new mongoose.Types.ObjectId(req.user?._id)] }
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, video[0], "Requested video fetched successfully")
        )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { title, description } = req.body

    const thumbnailLocalPath = req.file?.path;

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail file is missing")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnail?.url) {
        throw new ApiError(400, "Something went wrong when uploading file on cloudinary")
    }

    if (!videoId) {
        throw new ApiError(400, "Video ID is missing")
    }

    if (!title || !description) {
        throw new ApiError(400, "Title and description required")
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnail.url
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video details updated successfully")
        )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "Video ID is missing")
    }

    await Video.findByIdAndDelete(videoId)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Video deleted successfully")
        )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "Video ID is missing")
    }

    const video = await Video.findById(videoId)
    const currentPublishStatus = video?.isPublished

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                isPublished: !currentPublishStatus
            }
        },
        {
            new: true
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedVideo, "Video publish status changed successfully")
        )
})

export {
    getAllVideos,
    getCurrentUserVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
