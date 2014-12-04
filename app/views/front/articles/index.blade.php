@extends('front.layout')

@section('include')
<link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
@stop


@section('content')

<?php /* @var $faker Faker\Generator */ 
        
    $categories[0] = 'All';

?>

<div class="container">

    <div class="row">

        <div class="col-sm-3">

            <div class="panel panel-default" style="position: fixed;">
              <div class="panel-heading">Search parameters</div>
              <div class="panel-body">

                  <form role="form">

                      <div class="form-group">
                          <label>Search phrase</label>
                          <input type="text" name="phrase" id="" class="form-control" value="<%%Input::get('phrase')%%>" />
                      </div>
                      
                      <div class="form-group">
                          <label>Categories</label>                          
                          <?=Form::select('category_id', $categories, Input::get('category_id'), ['class' => 'form-control', 'style' => 'width: 249px;'])?>
                      </div>
                      
                      <div class="form-group">
                          <label>Show order</label>                          
                          <?=Form::select('order', $orderOptions, Input::get('order'), ['class' => 'form-control']); ?>
                      </div>

                      <div class="checkbox">
                          <label>
                              <input type="checkbox"> Only with foto
                          </label>
                          <label>
                              <input type="checkbox"> Show started works
                          </label>
                      </div>
                      <button type="submit" class="btn btn-success">Search</button>
                  </form>

              </div>
            </div>


        </div>

        <div class="col-sm-7">

            <div style="overflow: hidden;">
                <nav class="pull-right" >
                    <?=$articles->links();?>
                </nav>
                
                <p class="text-info pull-left">We have found <?=$articles->getTotal();?> entities</p>
            </div>

            <?php foreach ($articles as $article){ /* @var $article Article */ ?>
            <div class="entity">
                <div style="background:<?=$faker->hexcolor?>" class="image"></div>
                
                <div class="description">
                    <h4><a href="<?=action('front.articles.show', ['articles' => $article->id]);?>"><?=$article->title;?></a></h4>
                    <p class="additional"><?=$faker->company?> | <?=$faker->date();?></p>
                    <p><?=Str::limit($article->body, 200);?></p>
                </div>
                
            </div>
            <?php } ?>
            
            <nav>
                <?=$articles->links();?>
            </nav>



        </div>        

        <div class="col-sm-2">
            <div class="list-group">
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading"><?=$faker->country?></h4>
                <p class="list-group-item-text"><small><?=$faker->text()?></small></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading"><?=$faker->country?></h4>
                <p class="list-group-item-text"><small><?=$faker->text()?></small></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading"><?=$faker->country?></h4>
                <p class="list-group-item-text"><small><?=$faker->text()?></small></p>
              </a>
              <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading"><?=$faker->country?></h4>
                <p class="list-group-item-text"><small><?=$faker->text()?></small></p>
              </a>
            </div>


        </div>        

    </div>



</div>
@stop