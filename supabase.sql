-- trigger that will be called when a new user is created in auth.users
-- insert auth.users record into public.users
-- create a new workspace for the user
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public."Users" ("userId", email)
  values (new.id, new.email);
  return new;
end;

$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();


-- trigger that inserts a new workspace upon user creation
-- the workspace's ownerId is the user's id
create or replace function public.handle_new_workspace()
returns trigger as $$
begin
  insert into public."Workspaces" ("ownerId", "name")
  values (new."userId", 'My Default Workspace');
  return new;
end;

$$ language plpgsql security definer;


create trigger on_user_created
  after insert on public."Users"
  for each row  
  execute procedure public.handle_new_workspace();

  
