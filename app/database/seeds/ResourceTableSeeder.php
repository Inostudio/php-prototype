<?php

use Faker\Factory as Faker;

class ResourceTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('resources')->delete();
        $faker = Faker::create();
        foreach (range(1, 54) as $id){
            Resource::create([
                'id' => $id,
                'title' => $faker->text(20),
                'url'   =>  $faker->imageUrl($width = 640, $height = 480),
                'path' => $faker->imageUrl($width = 640, $height = 480)
            ]);
        }
        /*foreach (range(1, 10) as $id){
            Resource::create([
                'id' => $id,
                'title' => $faker->text(20),
                'url'   =>  '/public/resources/pics/'.$id.'.jpg',
                'path' => '/public/resources/pics/'.$id.'.jpg'
            ]);
        }*/
    }    
}