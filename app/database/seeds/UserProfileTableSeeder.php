<?php

class UserProfileTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('user_profile')->delete();

        $faker = Faker\Factory::create();

        foreach (range(1, 100) as $id){
            UserProfile::create([
                'id' => $id,
                'user_id' => $id,
                'first_name' => $faker->firstName(),
                'last_name' => $faker->lastName(),
                'phone' => $faker->phoneNumber()
            ]);
        }

    }
}