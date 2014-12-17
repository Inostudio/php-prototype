<?php

use Faker\Factory as Faker;
use Illuminate\Support\Collection;

class CategoryTableSeeder extends Seeder {

	public function run()
	{
        DB::table('categories')->delete();
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Category::create([
                'id' => $index,
                'title' => $faker->country,
                'status' => Collection::make([Category::STATUS_PUBLISH, Category::STATUS_UNPUBLISH])->random(1)
			]);
		}
	}

}