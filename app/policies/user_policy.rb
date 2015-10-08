class UserPolicy < ApplicationPolicy
  def index?
    user.role.in?(%w(manager admin))
  end

  def show?
    record.id == user.id || user.role.in?(%w(manager admin))
  end

  def create?
    true
  end

  def update?
    record.id == user.id || user.role.in?(%w(manager admin))
  end

  # def destroy?
  #   record.id == user.id || user.role.in?(%w(manager admin))
  # end

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.all
    end
  end
end