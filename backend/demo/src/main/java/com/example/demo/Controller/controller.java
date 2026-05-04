package com.example.demo.Controller;

import com.example.demo.Model.Stands;
import com.example.demo.repository.StandsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stands")
@CrossOrigin(origins = "*") // Cambiado a "*" para que funcione sin problemas en Render
public class controller { 

    @Autowired
    private StandsRepository standsRepository;

    // CREATE - Crear un nuevo Stand (POST)
    @PostMapping
    public Stands createStand(@RequestBody Stands stand) {
        return standsRepository.save(stand);
    }

    // READ - Obtener todos los Stands (GET)
    @GetMapping
    public List<Stands> getAllStands() {
        return standsRepository.findAll();
    }

    // READ - Obtener un Stand por su ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Stands> getStandById(@PathVariable Long id) {
        Optional<Stands> stand = standsRepository.findById(id);
        return stand.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE - Actualizar información de un Stand (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Stands> updateStand(@PathVariable Long id, @RequestBody Stands standDetails) {
        Optional<Stands> stand = standsRepository.findById(id);
        if (stand.isPresent()) {
            Stands existingStand = stand.get();
            
            // Actualizando datos básicos
            existingStand.setName(standDetails.getName());
            existingStand.setStandUser(standDetails.getStandUser());
            existingStand.setAbility(standDetails.getAbility());
            
            // Actualizando URLs de imágenes (Stand y Usuario)
            existingStand.setImageUrl(standDetails.getImageUrl());
            existingStand.setUserImageUrl(standDetails.getUserImageUrl()); 
            
            // Actualizando estadísticas
            existingStand.setPower(standDetails.getPower());
            existingStand.setSpeed(standDetails.getSpeed());
            existingStand.setRange(standDetails.getRange());
            existingStand.setDurability(standDetails.getDurability());
            existingStand.setPrecision(standDetails.getPrecision());
            existingStand.setPotential(standDetails.getPotential());
            
            return ResponseEntity.ok(standsRepository.save(existingStand));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - Eliminar un Stand (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStand(@PathVariable Long id) {
        if (standsRepository.existsById(id)) {
            standsRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}