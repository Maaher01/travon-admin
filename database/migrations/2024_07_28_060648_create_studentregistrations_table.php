<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentregistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studentregistrations', function (Blueprint $table) {
            $table->id();
            $table->string('_name');
            $table->string('_fathername');
            $table->string('_mothername');
            $table->date('_dob');
            $table->string('_email');
            $table->string('_mobile');
            $table->string('_parentmobile');
            $table->text('_address');
            $table->string('_qualification');
            $table->tinyInteger('_tribal');
            $table->tinyInteger('_freedom');
            $table->string('_interest');
            $table->string('_passyear');
            $table->string('_group');
            $table->string('_board');
            $table->string('_sscroll');
            $table->string('_sscnumber');
            $table->string('_gpa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('studentregistrations');
    }
}
