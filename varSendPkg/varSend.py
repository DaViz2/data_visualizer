import inspect

varsend = lambda var: varSend(var, get_var_name(var))

def varSend(varValue, var_name):
    print(f"Variable Name: {var_name}")
    print(f"Variable Type: {type(varValue)}")
    print(f"Variable Value: {varValue}")


def get_var_name(var):
    current_frame = inspect.currentframe()
    outer_frames = inspect.getouterframes(current_frame)
    if len(outer_frames) > 2:
        caller_frame = outer_frames[2]
        local_vars = caller_frame.frame.f_locals
        for name, value in local_vars.items():
            if value is var:
                return name
    return None