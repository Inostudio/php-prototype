<?php

class UserToGroupTableSeeder extends Seeder
{

    public function run()
    {

        DB::table('group_user')->delete();

        DB::table('group_user')->insert([
            'user_id' => 1,
            'group_id' => 1,
        ]);
    }

}