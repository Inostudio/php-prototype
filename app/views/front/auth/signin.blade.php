@extends('front.layout')

@section('content')
<!-- Begin page content -->
<div class="container">

    <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="panel-title">Sign In</div>
                <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Forgot password?</a></div>
            </div>     

            <div style="padding-top:30px" class="panel-body" >

                @if (Session::has('form_errors'))
                <div class="alert alert-danger col-sm-12"><?=Session::get('form_errors')?></div>
                @endif
                                
                @if(false and $errors->has())
                <div class="alert alert-danger col-sm-12">
                    @foreach ($errors->all(':message') as $m)
                        <?=$m?><br />
                    @endforeach
                </div>
                @endif

                <?=Form::open(['route' => 'front.signin', 'method' => 'post', 'class' => 'form-vertical'])?>

                    <div class="form-group <?=$errors->has('email')? 'has-error': '' ?> ">
                        <div class="input-group ">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <?=Form::text('email', null, ['class' => 'form-control', 'placeholder' => 'Email'])?>
                        </div>
                        <p class="text-danger small"><?=$errors->first('email', ':message');?></p>
                    </div>
                
                    <div class="form-group <?=$errors->has('password')? 'has-error': '' ?>">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <?=Form::password('password', ['class' => 'form-control', 'placeholder' => 'Password']);?>
                        </div>
                        <p class="text-danger small"><?=$errors->first('password', ':message');?></p>
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <?=Form::checkbox('remember', 1);?> Remember me
                            </label>
                        </div>
                    </div>

                    <div style="margin-top:10px" class="form-group text-center">                        
                        <div class="col-sm-12 controls">
                            <button  type="submit" class="btn btn-success"><i class="fa fa-sign-in"></i> Login</button>
                            <a href="#" class="btn btn-primary"><i class="fa fa-facebook"></i> Login with Facebook</a>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-12 control">
                            <div style="padding-top:25px; font-size:80%" >
                                Don't have an account? 
                                <a href="<?=action('front.signup')?>">Sign Up Here</a>
                            </div>
                        </div>
                    </div>    
                </form>     

            </div>                     
        </div>  
    </div>

</div>
@stop