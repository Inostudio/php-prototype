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
        DB::table('group_user')->insert([
            'user_id' => 2,
            'group_id' => 1,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 1,
            'group_id' => 3,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 2,
            'group_id' => 3,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 5,
            'group_id' => 2,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 6,
            'group_id' => 2,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 7,
            'group_id' => 2,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 8,
            'group_id' => 2,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 10,
            'group_id' => 4,
        ]);
        DB::table('group_user')->insert([
            'user_id' => 11,
            'group_id' => 4,
        ]);
    }

}