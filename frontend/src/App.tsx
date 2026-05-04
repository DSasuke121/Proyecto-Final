import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import './App.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface Stand {
  id?: number;
  name: string;
  standUser: string;
  ability: string;
  imageUrl: string;      
  userImageUrl: string;  
  power: number;
  speed: number;
  range: number;
  durability: number;
  precision: number;
  potential: number;
}

const API_URL = 'http://localhost:8080/api/stands';

const StandPrismCard = ({ stand, onEdit, onDelete }: { stand: Stand, onEdit: (s: Stand) => void, onDelete: (id: number) => void }) => {
  const [currentFace, setCurrentFace] = useState(0);

  // Función exclusiva para girar
  const rotatePrism = () => {
    setCurrentFace((prevFace) => (prevFace + 1) % 3);
  };

  // Función exclusiva para editar
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Detiene cualquier otro evento
    onEdit(stand);
  };

  // Función exclusiva para eliminar
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (stand.id) onDelete(stand.id);
  };

  return (
    <div className={`flip-card-prism show-face-${currentFace}`}>
      <div className="prism-inner">
        
        {/* CARA 0: USUARIO */}
        <div className="prism-side side-user" onClick={rotatePrism}>
          <h3 className="card-name-user">{stand.standUser}</h3>
          <img 
            src={stand.userImageUrl || 'https://via.placeholder.com/300?text=Usuario'} 
            alt={stand.standUser} 
            className="prism-image" 
          />
          <div className="click-hint">CLICK PARA VER STAND</div>
        </div>

        {/* CARA 1: STAND */}
        <div className="prism-side side-stand" onClick={rotatePrism}>
          <h3 className="card-name-stand">{stand.name}</h3>
          <img src={stand.imageUrl} alt={stand.name} className="prism-image" />
          <div className="click-hint">CLICK PARA VER ESTADÍSTICAS</div>
        </div>

        {/* CARA 2: STATS */}
        <div className="prism-side side-stats">
          {/* Este contenedor invisible es el que hace girar la tarjeta */}
          <div className="stats-clickable-area" onClick={rotatePrism}>
            <div className="back-info-header">
              <h3>{stand.name}</h3>
              <p className="ability-text"><em>{stand.ability}</em></p>
            </div>
            
            <div className="chart-container">
              <Radar 
                data={{
                  labels: ['Fuerza', 'Velocidad', 'Precisión', 'Potencial', 'Resistencia', 'Alcance'],
                  datasets: [{
                    data: [stand.power, stand.speed, stand.precision, stand.potential, stand.durability, stand.range],
                    backgroundColor: 'rgba(106, 27, 154, 0.4)',
                    borderColor: 'rgba(106, 27, 154, 1)',
                    pointBackgroundColor: 'rgba(106, 27, 154, 1)',
                    borderWidth: 2
                  }]
                }}
                options={{
                  scales: { r: { min: 0, max: 5, ticks: { display: false }, grid: { color: '#ccc' } } },
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false
                }}
              />
            </div>
            <div className="click-hint">CLICK PARA VER USUARIO</div>
          </div>
          
          {/* Los botones están TOTALMENTE SEPARADOS del área de clic para girar */}
          <div className="card-buttons">
            <button type="button" className="edit-btn" onClick={handleEditClick}>Editar</button>
            <button type="button" className="delete-btn" onClick={handleDeleteClick}>Eliminar</button>
          </div>
        </div>

      </div>
    </div>
  );
};

function App() {
  const [stands, setStands] = useState<Stand[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Stand>({
    name: '', standUser: '', ability: '', imageUrl: '', userImageUrl: '',
    power: 1, speed: 1, range: 1, durability: 1, precision: 1, potential: 1
  });

  useEffect(() => { loadStands(); }, []);

  const loadStands = async () => {
    try {
      const response = await axios.get<Stand[]>(API_URL);
      setStands(response.data);
    } catch (error) { console.error(error); }
  };

  const handleAppEdit = (stand: Stand) => {
    setFormData({
      name: stand.name,
      standUser: stand.standUser,
      ability: stand.ability,
      imageUrl: stand.imageUrl,
      userImageUrl: stand.userImageUrl || '',
      power: stand.power,
      speed: stand.speed,
      range: stand.range,
      durability: stand.durability,
      precision: stand.precision,
      potential: stand.potential
    });
    setEditingId(stand.id!);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      loadStands();
      setEditingId(null);
      setFormData({ name: '', standUser: '', ability: '', imageUrl: '', userImageUrl: '', power: 1, speed: 1, range: 1, durability: 1, precision: 1, potential: 1 });
    } catch (error) { console.error("Error guardando:", error); }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', standUser: '', ability: '', imageUrl: '', userImageUrl: '', power: 1, speed: 1, range: 1, durability: 1, precision: 1, potential: 1 });
  };

  return (
    <div className="main-container">
      <h1>Inventario de Stands</h1>
      
      <div className="form-container">
        <h2>{editingId ? `Editando: ${formData.name}` : 'Nuevo Registro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group"><label>Stand</label><input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></div>
          <div className="input-group"><label>Usuario</label><input type="text" name="standUser" value={formData.standUser} onChange={(e) => setFormData({...formData, standUser: e.target.value})} required /></div>
          <div className="input-group"><label>Habilidad</label><input type="text" name="ability" value={formData.ability} onChange={(e) => setFormData({...formData, ability: e.target.value})} required /></div>
          <div className="input-group"><label>URL Usuario</label><input type="url" name="userImageUrl" value={formData.userImageUrl} onChange={(e) => setFormData({...formData, userImageUrl: e.target.value})} /></div>
          <div className="input-group"><label>URL Stand</label><input type="url" name="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} required /></div>

          <div className="stats-grid">
            <div className="stat-field"><label>Fuerza</label><input type="number" name="power" min="1" max="5" value={formData.power} onChange={(e) => setFormData({...formData, power: Number(e.target.value)})} /></div>
            <div className="stat-field"><label>Alcance</label><input type="number" name="range" min="1" max="5" value={formData.range} onChange={(e) => setFormData({...formData, range: Number(e.target.value)})} /></div>
            <div className="stat-field"><label>Velocidad</label><input type="number" name="speed" min="1" max="5" value={formData.speed} onChange={(e) => setFormData({...formData, speed: Number(e.target.value)})} /></div>
            <div className="stat-field"><label>Precisión</label><input type="number" name="precision" min="1" max="5" value={formData.precision} onChange={(e) => setFormData({...formData, precision: Number(e.target.value)})} /></div>
            <div className="stat-field"><label>Potencial</label><input type="number" name="potential" min="1" max="5" value={formData.potential} onChange={(e) => setFormData({...formData, potential: Number(e.target.value)})} /></div>
            <div className="stat-field"><label>Resistencia</label><input type="number" name="durability" min="1" max="5" value={formData.durability} onChange={(e) => setFormData({...formData, durability: Number(e.target.value)})} /></div>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <button type="submit" className="save-btn" style={{flex: 2}}>{editingId ? 'ACTUALIZAR' : 'GUARDAR'}</button>
            {editingId && <button type="button" className="save-btn" style={{flex: 1, backgroundColor: '#6c757d', border: 'none', color: 'white'}} onClick={handleCancel}>CANCELAR</button>}
          </div>
        </form>
      </div>

      <h2 className="section-title">Stands</h2>
      <div className="stands-container">
        {stands.map(s => (
          <StandPrismCard key={s.id} stand={s} onEdit={handleAppEdit} onDelete={(id) => axios.delete(`${API_URL}/${id}`).then(loadStands)} />
        ))}
      </div>
    </div>
  );
}

export default App;