<?php

use Faker\Factory as Faker;
use Illuminate\Support\Collection;

class CategoryTableSeeder extends Seeder {

	public function run()
	{
        DB::table('categories')->delete();
		$faker = Faker::create();
                Category::create([
                    'id' => 1,
                    'title' => 'Other',
                    'isDefault'   =>  true
                ]);
		foreach(range(2, 10) as $index)
		{
                    Category::create([
                        'id' => $index,
                        'title' => $faker->streetName
                    ]);
		}   
	}

}