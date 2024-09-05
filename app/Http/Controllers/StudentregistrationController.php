<?php

namespace App\Http\Controllers;

use App\Models\Studentregistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
class StudentregistrationController extends Controller
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
            'mobile' => ['required', 'string', 'max:14'],
            'passyear' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with(['error' => 'Please fill out all the necessary fields.']);
        }
        
        $profile = Studentregistration::create([
            '_name' => $request->name,
            '_fathername' => $request->fathername,
            '_mothername' => $request->mothername,
            '_dob' => date("Y-m-d ", strtotime($request->dob)),
            '_email' => $request->email,
            '_address' => $request->address,
            '_qualification' => $request->qualification,
            '_mobile' => $request->mobile,
            '_parentmobile' => $request->parentmobile,
            '_tribal' => $request->tribal,
            '_freedom' => $request->freedom,
            '_interest' => $request->interest,
            '_passyear' => $request->passyear,
            '_group' => $request->group,
            '_board' => $request->board,
            '_sscroll' => $request->sscroll,
            '_sscnumber' => $request->sscnumber,
            '_gpa' => $request->gpa,
        ]);

       return redirect()->back()->with(['success' => 'Application submitted successfully. We will contact you soon.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Studentregistration $studentregistration)
    {
        $limit = $request->limit;
        
        $profile = DB::table("studentregistrations")->select('studentregistrations.*')->paginate($limit);

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function edit(Studentregistration $studentregistration, $id)
    {
        $profile = Studentregistration::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Studentregistration $studentregistration , $id)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => ['required', 'string', 'max:14'],
            'passyear' => ['required', 'string'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $profile = Studentregistration::where('id', '=', $id)->update([
            '_name' => $request->name,
            '_fathername' => $request->fathername,
            '_mothername' => $request->mothername,
            '_dob' => date("Y-m-d ", strtotime($request->dob)),
            '_email' => $request->email,
            '_address' => $request->address,
            '_qualification' => $request->qualification,
            '_mobile' => $request->mobile,
            '_parentmobile' => $request->parentmobile,
            '_tribal' => $request->tribal,
            '_freedom' => $request->freedom,
            '_interest' => $request->interest,
            '_passyear' => $request->passyear,
            '_group' => $request->group,
            '_board' => $request->board,
            '_sscroll' => $request->sscroll,
            '_sscnumber' => $request->sscnumber,
            '_gpa' => $request->gpa,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Studentregistration $studentregistration)
    {
        //
    }
}
