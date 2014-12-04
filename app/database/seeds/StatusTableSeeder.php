<?php


class StatusTableSeeder extends Seeder {

	public function run()
	{
        Status::create(['title' => 'private']);
		Status::create(['title' => 'public']);
        Status::create(['title' => 'draw']);
	}

}