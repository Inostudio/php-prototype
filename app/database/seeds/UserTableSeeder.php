<?php

class UserTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();

        User::create([
            'password' => Hash::make('1234'),
            'email' => "dragg.ko@gmail.com"
        ]);

        foreach (range(2, 100) as $id){
            User::create([
                'id' => $id,
                'password' => Hash::make('1234'),
                'email' => "user$id@laravel.dev"
            ]);
        }
        
    }    
}