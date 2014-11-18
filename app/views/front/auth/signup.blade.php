@extends('front.layout')

@section('content')
<div class="container">
    <div id="signupbox" style="margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title">Sign Up</div>
                <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="<?=action('front.signin')?>" >Sign In</a></div>
            </div>  
            <div class="panel-body" >
                
                <?=Form::open(['route' => 'front.signup', 'method' => 'post', 'class' => 'form-horizontal']);?>
                
                    @if (Session::has('form_errors'))
                    <div class="alert alert-danger col-sm-12"><?=Session::get('form_errors')?></div>
                    @endif
                    
                    <div class="form-group <?=$errors->has('email') ? 'has-error': '' ?> ">
                        <label for="email" class="col-md-4 control-label">Email</label>
                        <div class="col-md-8">
                            <?=Form::text('email', null, ['class' => 'form-control', 'placeholder' => 'Email']);?>
                            <p class="text-danger small"><?=$errors->first('email', ':message');?></p>
                        </div>
                    </div>

                    <div class="form-group <?=$errors->has('password')? 'has-error': '' ?>">
                        <label for="password" class="col-md-4 control-label">Password</label>
                        <div class="col-md-8">
                            <?=Form::password('password', ['class' => 'form-control', 'placeholder' => 'Password']);?>
                            <p class="text-danger small"><?=$errors->first('password', ':message');?></p>
                        </div>
                    </div>
                
                    <div class="form-group <?=$errors->has('password_confirmation')? 'has-error': '' ?>">
                        <label for="password" class="col-md-4 control-label">Password confirm</label>
                        <div class="col-md-8">
                            <?=Form::password('password_confirmation', ['class' => 'form-control', 'placeholder' => 'Password confirm']);?>
                            <p class="text-danger small"><?=$errors->first('password_confirmation', ':message');?></p>
                        </div>
                    </div>

                    <?php if(0){ ?>
                    <div class="form-group">
                        <label for="icode" class="col-md-4 control-label">Invitation Code</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control" name="icode" placeholder="">
                        </div>
                    </div>
                    <?php  } ?>

                    <div class="form-group">                        
                        <div class="col-md-offset-4 col-md-8">
                            <button id="btn-signup" type="submit" class="btn btn-info"><i class="fa fa-sign-in"></i> &nbsp Sign Up</button>
                            <button id="btn-fbsignup" type="button" class="btn btn-primary"><i class="fa fa-facebook"></i> Sign Up with Facebook</button>
                        </div>
                    </div>
                                       
                </form>
            </div>
        </div>

    </div>    


</div>
@stop