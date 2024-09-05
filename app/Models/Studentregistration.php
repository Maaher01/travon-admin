<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studentregistration extends Model
{
    use HasFactory;

    protected $fillable = [
        '_name',
        '_fathername',
        '_mothername',
        '_dob',
        '_email',
        '_address',
        '_mobile',
        '_parentmobile',
        '_tribal',
        '_freedom',
        '_interest',
        '_qualification',
        '_passyear',
        '_group',
        '_board',
        '_sscroll',
        '_sscnumber',
        '_gpa',
    ];
}
