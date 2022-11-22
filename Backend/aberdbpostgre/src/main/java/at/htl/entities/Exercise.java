package at.htl.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
@Entity
public class Exercise extends PanacheEntity{
    @Column(length = 64, unique = true, nullable = false)
    public String name;

    @Column(name = "muscle_group", nullable = false)
    public String muscleGroup;

    @Column(name = "description")
    public String description;

    public Exercise(){
    }

    public Exercise(String name, String muscleGroup){
        this.name = name;
        this.muscleGroup = muscleGroup;
    }

    public Exercise(String name, String muscleGroup, String description){
        this.name = name;
        this.muscleGroup = muscleGroup;
        this.description = description;
    }

}
