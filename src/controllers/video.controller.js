import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    if(!title || !description){
        throw new ApiError(400, "Title and description required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if(!videoLocalPath || !thumbnailLocalPath){
        throw new ApiError(400, "Video and Thumbnail is required")
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!video || !thumbnail){
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

    if(!videoId){
        throw new ApiError(400, "Video ID not found")
    }

    const video = await Video.findById(videoId)

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Requested video fetched successfully")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title, description} = req.body

    const thumbnailLocalPath = req.file?.path;

    if(!thumbnailLocalPath){
        throw new ApiError(400, "thumbnail file is missing")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!thumbnail?.url){
        throw new ApiError(400, "Something went wrong when uploading file on cloudinary")
    }

    if(!videoId){
        throw new ApiError(400, "Video ID is missing")
    }

    if(!title || !description){
        throw new ApiError(400, "Title and description required")
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:{
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

    if(!videoId){
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

    if(!videoId){
        throw new ApiError(400, "Video ID is missing")
    }

    const video = await Video.findById(video)
    const currentPublishStatus = video?.isPublished

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:{
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
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
