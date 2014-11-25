@extends('front.layout')

@section('include')
<link rel="stylesheet" type="text/css" href="/front/css/entity.css" media="all" />
@show


@section('content')

<?php /* @var $faker Faker\Generator */ ?>

<div class="container">

    <div class="row">

        <div class="col-sm-3">

            <div class="panel panel-default" style="position: fixed;">
              <div class="panel-heading">Search parameters</div>
              <div class="panel-body">

                  <form role="form">

                      <div class="form-group">
                          <label>Search phrase</label>
                          <input type="text" name="" id="" class="form-control" />
                      </div>
                      
                      <div class="form-group">
                          <label>Type</label>
                          <select name="" id="" class="form-control">
                              <?php foreach (range(1, 10) as $t){ ?>
                              <option value=""><?=ucfirst($faker->word);?></option>
                              <?php } ?>
                          </select>
                      </div>
                      
                      <div class="form-group">
                          <label>Order by</label>
                          <select name="" id="" class="form-control">
                              <?php foreach (range(1, 3) as $t){ ?>
                              <option value=""><?=ucfirst($faker->word);?></option>
                              <?php } ?>
                          </select>
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
                    <ul class="pagination" style="margin-top: 0;">
                        <li><a href="#"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>
                    </ul>
                </nav>
                
                <p class="text-info pull-left">We have found 50 entities</p>
            </div>

            <?php foreach (range(1, 10) as $f){ ?>
            <div class="entity">
                <div style="background:<?=$faker->hexcolor?>" class="image"></div>
                <h4><?=$faker->sentence();?></h4>
                <p><?=$faker->text();?></p>
            </div>
            <?php } ?>
            
            <nav>
                <ul class="pagination">
                    <li><a href="#"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>
                </ul>
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