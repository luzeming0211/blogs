<?php

namespace App\Admin\Controllers;

use App\Models\Article;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class ArticleController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = '文章管理';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Article);

        $grid->column('id', __('ID'))->sortable();
        $grid->column('title', __('标题'));
        $grid->column('created_at', __('Created at'));
        $grid->column('updated_at', __('Updated at'));

        return $grid;
    }


    protected function form()
    {
        $form = new Form(new Article);
        $form->text('title', __('标题'))->rules('required');
        $form->hidden('userid')->default(Admin::user()->id);
        $form->editormd('content', __('内容'));

        $form->saved(function (Form $form) {
            $id = $form->model()->id;
            $content = $form->model()->content;
            Article::upContentHtml($id, $content);
        });
        return $form;
    }
}
