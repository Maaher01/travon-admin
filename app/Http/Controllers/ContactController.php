<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class ContactController extends Controller
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
            'name' => ['required'],
            'mobile' => ['required', 'string', 'max:14'],
            'message' => ['required'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->with(['error' => 'Please fill out all the necessary fields.']);
        }
        
        $profile = Contact::create([
            '_name' => $request->name,
            '_email' => $request->email,
            '_mobile' => $request->mobile,
            '_topic' => $request->topic,
            '_message' => $request->message,
        ]);

        return redirect()->back()->with(['success' => 'Query message submitted successfully. We will contact you soon.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Contact $contact)
    {
        $limit = $request->limit;
        
        $profile = Contact::paginate($limit);

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact, $id)
    {
       $profile = Contact::where('id',$id)->first();

       return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact,$id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'mobile' => ['required', 'string', 'max:14'],
            'message' => ['required'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $profile = Contact::where('id', '=', $id)->update([
            '_name' => $request->name,
            '_email' => $request->email,
            '_mobile' => $request->mobile,
            '_topic' => $request->topic,
            '_message' => $request->message,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
