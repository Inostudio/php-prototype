<style>
    h2{
        text-indent: 40px;
        text-align: justify;
    }
    .articleBody{
        text-indent: 40px;
        text-align: justify;
    }
    .greenSpan{
        color: green;
    }
</style>
<div class="container">
    <div class="row">        
        <div class="col-sm-12">
            <h2>{{vm.article.title}}</h2>
            <h4><span class="greenSpan"><%trans('/front/articles/show.created')%>: </span><a href="#/user/{{vm.article.user_id}}">{{vm.article.user_id == vm.currentUserId ? vm.you : vm.userArticle.profile.last_name}}</a></h4>
            <h4><span class="greenSpan"><%trans('/front/articles/show.category')%>:</span> {{vm.article.category.title}}</h4>
            <h4><span class="greenSpan"><%trans('/front/articles/show.date_of_creation')%>:</span> {{vm.article.created_at}}</h4>
            <h4><span class="greenSpan"><%trans('/front/articles/show.date_of_last_change')%>:</span> {{vm.article.updated_at}}</h4>
            <h4><span class="greenSpan"><%trans('/front/articles/show.phone')%>:</span> {{vm.userArticle.profile.phone}}</h4>
        </div>
        <div class="articleBody">
            {{vm.article.body}}
        </div>
    </div>
</div>