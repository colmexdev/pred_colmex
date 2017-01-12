class Participante < ActiveRecord::Base
  self.table_name = 'participantes'
  attr_accessor :tipo_tipo, :sel_tipo, :curso_p, :tipo_curso, :sel_curso, :parts
end
