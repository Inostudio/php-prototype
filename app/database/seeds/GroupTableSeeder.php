<?php

class GroupTableSeeder extends Seeder {

    public function run() {
        //DB::table('users')->truncate();
        
        DB::table('groups')->insert([
            'title' => 'User',
        ]);
    }

}