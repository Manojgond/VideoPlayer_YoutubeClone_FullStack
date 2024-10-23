import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const {name, description} = req.body
    const user = req.user

    if(!user){
        throw new ApiError(401, "Unauthorized request, can't create playlist")
    }

    if(!name || !description){
        throw new ApiError(400, "Name and Description required.")
    }

    const playlist = await Playlist.create(
        {
            name,
            description,
            owner: user?._id
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist created successfully")
    )

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if(!userId){
        throw new ApiError(400, "userId not found")
    }

    const userPlaylists = await Playlist.find(
        {
            owner: userId
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, userPlaylists[0], "User Playlist fetched successfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!playlistId){
        throw new ApiError(400, "playlistId not found")
    }

    const playlist = await Playlist.aggregate([
        {
            $match:{
                _id: playlistId
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "videoOwner",
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
                            owner:{
                                $first: "$videoOwner"
                            }
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "playlistOwner",
                pipeline:[
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist fetched successfully")
    )

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: Add video to playlist
    if(!playlistId){
        throw new ApiError(400, "Playlist ID not found")
    }
    if(!videoId){
        throw new ApiError(400, "Video ID not found")
    }

    const playlist = await Playlist.updateOne(
        {
            _id: playlistId
        },
        {
            $push:{
                video: videoId
            }
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "video added to playlist successfully")
    )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if(!playlistId){
        throw new ApiError(400, "Playlist ID not found")
    }
    if(!videoId){
        throw new ApiError(400, "Video ID not found")
    }

    const playlist = await Playlist.updateOne(
        {
            _id: playlistId
        },
        {
            $pull:{
                video: videoId
            }
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "video added to playlist successfully")
    )
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!playlistId){
        throw new ApiError(400, "Playlist ID not found")
    }

    await Playlist.findByIdAndDelete(playlistId);

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Playlist deleted successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!name || !description){
        throw new ApiError(400, "Name and Description required.")
    }

    if(!playlistId){
        throw new ApiError(400, "Playlist ID not found")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist updated successfully")
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
