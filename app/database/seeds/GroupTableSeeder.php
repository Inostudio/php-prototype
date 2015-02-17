<?php

class GroupTableSeeder extends Seeder {

    public function run() {
        
        DB::table('groups')->delete();
        
        DB::table('groups')->insert([
            'title' => 'admins',
            'isAdmin'   =>  true
        ]);
        DB::table('groups')->insert([
            'title' => 'moderators'
        ]);
        DB::table('groups')->insert([
            'title' => 'developers'
        ]);
        DB::table('groups')->insert([
            'title' => 'managers'
        ]);
    }

}