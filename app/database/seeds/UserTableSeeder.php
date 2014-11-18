<?php

class UserTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();
        
        foreach (range(1, 100) as $id){
            User::create([
                'id' => $id,
                'password' => Hash::make('123'),
                'email' => "user$id@laravel.dev"
            ]);
        }
        
    }    
}