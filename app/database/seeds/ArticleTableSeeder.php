<?php

use Faker\Factory as Faker;
use Illuminate\Support\Collection;

class ArticleTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('articles')->delete();
        Article::unguard();
        $faker = Faker::create();
        
        $statuses = Collection::make([Article::STATUS_DRAFT, Article::STATUS_PUBLISH, Article::STATUS_DELETED]);

        foreach (range(1, 150) as $index) {
            Article::create([
                'id' => $index,
                'title' => $faker->text(255),
                'body' => $faker->text(1000),
                'user_id' => mt_rand(1, 100),
                'category_id' => mt_rand(1, 20),
                'status' => $statuses->random(1)                
            ]);
        }
    }

}
