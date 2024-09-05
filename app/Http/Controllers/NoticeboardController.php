<?php

namespace App\Http\Controllers;

use App\Models\Noticeboard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class NoticeboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg,pdf', 'max:3072']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('eventimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        
        $profile = Noticeboard::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_description' => $request->description,
            '_time' => $request->time,
            '_date' => date("Y-m-d ",strtotime($request->date)),
            '_status' => $request->status,
            '_location' => $request->location,
            '_latlong' => $request->latlong,
            '_image' => $path ? asset("/uploads") . "/" . $path : null
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Noticeboard $noticeboard
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Noticeboard $noticeboard)
    {
        $limit = $request->limit;
        $profile = Noticeboard::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Noticeboard $noticeboard
     * @return \Illuminate\Http\Response
     */
    public function edit(Noticeboard$Noticeboard, $id)
    {
        $profile = Noticeboard::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Noticeboard  $noticeboard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Noticeboard $noticeboard, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg,pdf', 'max:3072']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('eventimage', 'public'); 
        } 
        
        if($request->hasFile('image')){  
            $profile = Noticeboard::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_time' => $request->time,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status,
                '_location' => $request->location,
                '_latlong' => $request->latlong,
                '_image' => $path ? asset("/uploads") . "/" . $path : null
            ]);
        }else{
           $profile = Noticeboard::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_time' => $request->time,
                '_location' => $request->location,
                '_latlong' => $request->latlong,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status
            ]); 
        }
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Noticeboard $noticeboard
     * @return \Illuminate\Http\Response
     */
    public function destroy(Noticeboard $noticeboard)
    {
        //
    }
}
