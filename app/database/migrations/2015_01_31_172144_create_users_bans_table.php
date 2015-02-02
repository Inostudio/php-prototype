<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersBansTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
            Schema::create('users_bans', function(Blueprint $table){
            $table->increments('id');
            $table->integer('user_id');
            $table->dateTime('begin');
            $table->dateTime('end');
            $table->string('reason');
            $table->timestamps();

            $table->softDeletes();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
            Schema::drop('users_bans');
	}

}
