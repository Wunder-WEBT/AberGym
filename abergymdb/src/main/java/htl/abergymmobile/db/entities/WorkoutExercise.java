package htl.abergymmobile.db.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "WorkoutExercise")
public class WorkoutExercise {
    //Attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    public int set;

    @Column
    public double weight;

    @Column
    public int reps;

    @Column
    public double time;

    //Navigation

    /*@ManyToOne
    @JoinColumn(name="workoutplan_id", nullable=false)
    public Workoutplan workoutplan;

    @ManyToOne
    @JoinColumn(name="exercise_id", nullable=false)
    public Exercise exercise;*/
}
