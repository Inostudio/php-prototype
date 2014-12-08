<?php


class StatusTableSeeder extends Seeder {

	public function run()
	{
        Status::create(['title' => 'Private']);
		Status::create(['title' => 'Public']);
        Status::create(['title' => 'Draw']);
	}

}