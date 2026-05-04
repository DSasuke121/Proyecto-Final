package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
public class Stands {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String standUser;
    private String ability;
    private String imageUrl; // Imagen del Stand
    private String userImageUrl; // NUEVA: Imagen del Usuario

    // Estadísticas (del 1 al 5)
    private int power;
    private int speed;
    private int range;
    private int durability;
    private int precision;
    private int potential;

    public Stands() {
    }

    public Stands(String name, String standUser, String ability, String imageUrl, String userImageUrl, int power, int speed, int range, int durability, int precision, int potential) {
        this.name = name;
        this.standUser = standUser;
        this.ability = ability;
        this.imageUrl = imageUrl;
        this.userImageUrl = userImageUrl;
        this.power = power;
        this.speed = speed;
        this.range = range;
        this.durability = durability;
        this.precision = precision;
        this.potential = potential;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStandUser() { return standUser; }
    public void setStandUser(String standUser) { this.standUser = standUser; }

    public String getAbility() { return ability; }
    public void setAbility(String ability) { this.ability = ability; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getUserImageUrl() { return userImageUrl; }
    public void setUserImageUrl(String userImageUrl) { this.userImageUrl = userImageUrl; }

    public int getPower() { return power; }
    public void setPower(int power) { this.power = power; }

    public int getSpeed() { return speed; }
    public void setSpeed(int speed) { this.speed = speed; }

    public int getRange() { return range; }
    public void setRange(int range) { this.range = range; }

    public int getDurability() { return durability; }
    public void setDurability(int durability) { this.durability = durability; }

    public int getPrecision() { return precision; }
    public void setPrecision(int precision) { this.precision = precision; }

    public int getPotential() { return potential; }
    public void setPotential(int potential) { this.potential = potential; }
}