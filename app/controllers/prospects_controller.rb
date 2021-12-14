class ProspectsController < ApplicationController
    def index
        prospects = Prospect.all 
        render json: prospects
    end

    def show
        prospect = Prospect.find(params[:id])
        if prospect
            render json: prospect, include: :company
        else
            render json: {error: "Prospect not found"}, status: :unprocessable_entity
        end
    end

    def create 
        prospect = Prospect.create(prospect_params)
        render json: prospect
    end
    
    private
    
    def prospect_params
        params.permit(:first_name, :last_name, :email, :stage, :phone, :company_id, :probability)
    end
end
