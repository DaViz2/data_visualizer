import inspect
import json

varsend = lambda var: varSend(var, get_var_name(var))

def varSend(varValue, var_name):
    var_info = {
        "Variable Name": var_name,
        "Variable Type": str(type(varValue)),
        "Variable Value": str(varValue)
    }
    with open('output.json', 'w') as f:
        json.dump(var_info, f)


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