<?php
/**
 * An helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace {
/**
 * Article
 *
 * @property integer $id
 * @property string $title
 * @property string $body
 * @property integer $user_id
 * @property integer $category_id
 * @property boolean $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\Article whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereTitle($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereBody($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereUserId($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereCategoryId($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereStatus($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereCreatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\Article whereUpdatedAt($value) 
 */
	class Article {}
}

namespace {
/**
 * Group
 *
 * @property integer $id
 * @property string $title
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\User[] $users
 * @method static \Illuminate\Database\Query\Builder|\Group whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\Group whereTitle($value) 
 * @method static \Illuminate\Database\Query\Builder|\Group whereDescription($value) 
 * @method static \Illuminate\Database\Query\Builder|\Group whereCreatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\Group whereUpdatedAt($value) 
 */
	class Group {}
}

namespace {
/**
 * Category
 *
 * @property integer $id
 * @property string $title
 * @property boolean $status
 * @method static \Illuminate\Database\Query\Builder|\Category whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\Category whereTitle($value) 
 * @method static \Illuminate\Database\Query\Builder|\Category whereStatus($value) 
 */
	class Category {}
}

namespace {
/**
 * Created by PhpStorm.
 * 
 * User: user
 * Date: 21.11.2014
 * Time: 15:53
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $first_name
 * @property string $last_name
 * @property string $phone
 * @property string $image
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereUserId($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereFirstName($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereLastName($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile wherePhone($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereImage($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereCreatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserProfile whereUpdatedAt($value) 
 */
	class UserProfile {}
}

namespace {
/**
 * User
 *
 * @property integer $id
 * @property string $email
 * @property string $password
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $remember_token
 * @method static \Illuminate\Database\Query\Builder|\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\User whereRememberToken($value)
 * @property-read \UserProfile $profile
 * @property-read \Illuminate\Database\Eloquent\Collection|\Group[] $groups
 */
	class User {}
}

namespace {
/**
 * UserToGroups
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $group_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\UserToGroups whereId($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserToGroups whereUserId($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserToGroups whereGroupId($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserToGroups whereCreatedAt($value) 
 * @method static \Illuminate\Database\Query\Builder|\UserToGroups whereUpdatedAt($value) 
 */
	class UserToGroups {}
}

