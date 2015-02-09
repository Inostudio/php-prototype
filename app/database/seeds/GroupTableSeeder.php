<?php

class GroupTableSeeder extends Seeder {

    public function run() {
        
        DB::table('groups')->delete();
        
        DB::table('groups')->insert([
            'title' => 'admins',
            'isAdmin'   =>  true
        ]);
    }

}