--  Exercise

Insert into exercise ( name, muscle_group, description) values ('Liegestütze', 'Bizeps', 'Lorem ipsum dolor sit amet, consetetur');
Insert into exercise ( name, muscle_group) values ('Bench Press', 'Brust');
Insert into exercise ( name, muscle_group) values ('Cable Flys', 'Brust');
Insert into exercise ( name, muscle_group) values ('Incline Dumbell press', 'Trizeps');
Insert into exercise ( name, muscle_group, description) values ('Biceps Curls', 'Bizeps', 'Lorem ipsum dolor sit amet, consetetur');
Insert into exercise ( name, muscle_group) values ('Triceps Extension', 'Trizeps');
Insert into exercise ( name, muscle_group, description) values ('Triceps Curls', 'Trizeps', 'Lorem ipsum dolor sit amet, consetetur');
Insert into exercise ( name, muscle_group, description) values ('Skullcrusher', 'Schultern', 'Lorem ipsum dolor sit amet, consetetur');


--------------------------------------------------------
--  First Customer | Test data
--------------------------------------------------------
Insert into Person (first_name,last_name,email) values ('Antonio','Peric','test@gmail.com');
Insert into Trainee (id) values (1);

--------------------------------------------------------
--  First Workoutplan
--------------------------------------------------------

Insert into Workoutplan (name,trainee_id) values ('Ganzkörper Workout', 1);

-- WorkoutExercise

Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,0.0,50,1,1);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,100.0,6,1,2);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,20.0,25,1,3);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,32.5,15,1,4);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,12.5,15,1,5);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,80.5,20,1,6);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (2,80.0,20,1,7);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (4,30.0,20,1,8);

--------------------------------------------------------
--  Second Workoutplan
--------------------------------------------------------

Insert into Workoutplan (name,trainee_id) values ('Ganzkörper Workout', 1);

-- WorkoutExercise

Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,10,50,2,1);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,100.0,6,2,2);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,20.0,25,2,3);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (3,32.5,15,2,4);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,12.5,15,2,5);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (5,80.5,20,2,6);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (2,80.0,20,2,7);
Insert into WorkoutExercise (sets,weight,reps,workoutplan_id, exercise_id) values (4,30.0,20,2,8);