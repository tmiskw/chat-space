class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json{@new_message = @messages.where("id > ? and group_id = ?",params[:last_id] ,params[:group_id])}
    end
  end
end