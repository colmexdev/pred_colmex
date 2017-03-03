require 'test_helper'

class ProduccionDigitalControllerTest < ActionController::TestCase
  test "should get cursos_breves" do
    get :cursos_breves
    assert_response :success
  end

end
