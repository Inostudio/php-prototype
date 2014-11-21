<?php
    $user = Auth::user();
?>

<div class="panel panel-info">
                <div class="panel-heading">
                  <h3 class="panel-title"><% $user->getFullName() %></h3>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=100" class="img-circle"> </div>
                    <div class=" col-md-9 col-lg-9 ">
                      <table class="table table-user-information">
                        <tbody>
                          <tr>
                            <td>First name:</td>
                            <td><% $user->profile->first_name %></td>
                          </tr>
                          <tr>
                            <td>Last name:</td>
                            <td><% $user->profile->last_name %></td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td><a href="mailto:info@support.com"><% $user->email %></a></td>
                          </tr>
                            <td>Phone Number</td>
                            <td><% $user->profile->phone %></td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </div>
