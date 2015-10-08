class TripPolicy < ApplicationPolicy

  def show?
    record.author_id == user.id || user.role == 'admin'
  end

  def update?
    record.author_id == user.id || user.role == 'admin'
  end

  def destroy?
    record.author_id == user.id || user.role == 'admin'
  end

  def create?
    true
  end

  class Scope < Scope
    def resolve
      if user.role == 'admin'
        scope.all
      else
        scope.where(author_id: user.id)
      end
    end
  end
end
