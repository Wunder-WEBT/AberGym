package at.htl.services;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.json.Json;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.annotations.jaxrs.PathParam;
import io.quarkus.panache.common.Sort;
import at.htl.entities.Workoutplan;
@Path("workoutplans")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class WorkoutplanService {

    @GET
    public List<Workoutplan> get() {
        return Workoutplan.listAll(Sort.by("id"));
    }

    @GET
    @Path("{id}")
    public Workoutplan getSingle(@PathParam Long id) {
        Workoutplan entity = Workoutplan.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Workoutplan with id of " + id + " does not exist.", 404);
        }
        return entity;
    }

    @POST
    @Transactional
    public Response create(Workoutplan workoutplan) {
        if (workoutplan.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        workoutplan.persist();
        return Response.ok(workoutplan).status(201).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Workoutplan update(@PathParam Long id, Workoutplan workoutplan) {
        if (workoutplan.name == null) {
            throw new WebApplicationException("Workoutplan Name was not set on request.", 422);
        }
        Workoutplan entity = Workoutplan.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Workoutplan with id of " + id + " does not exist.", 404);
        }
        entity.name = workoutplan.name;
        return entity;
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response delete(@PathParam Long id) {
        Workoutplan entity = Workoutplan.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Workoutplan with id of " + id + " does not exist.", 404);
        }
        entity.delete();
        return Response.status(204).build();
    }

    @Provider
    public static class ErrorMapper implements ExceptionMapper<Exception> {
        @Override
        public Response toResponse(Exception exception) {
            int code = 500;
            if (exception instanceof WebApplicationException) {
                code = ((WebApplicationException) exception).getResponse().getStatus();
            }
            return Response.status(code)
                    .entity(Json.createObjectBuilder().add("error", exception.getMessage()).add("code", code).build())
                    .build();
        }
    }
}