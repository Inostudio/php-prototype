<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfileTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('user_profile', function($table){
            $table->increments('id');
            $table->integer('user_id');
            $table->string('first_name')->default('');
            $table->string('last_name')->default('');
            $table->string('phone')->default('');
            $table->string('image')->default('');
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
        Schema::drop('user_profile');
	}

}
