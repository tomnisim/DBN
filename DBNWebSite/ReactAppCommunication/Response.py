from django.http import JsonResponse

def custom_response(success: bool, message: str, data=None, user_info=None, session_info=None, status: int = 200):
    """
    Create a standardized JSON response with optional user and session data.

    Parameters:
    - success (bool): Indicates whether the operation was successful.
    - message (str): A message to describe the result of the operation.
    - data (dict, optional): Additional data to include in the response.
    - user_info (dict, optional): User information to include in the response.
    - session_info (dict, optional): Session information to include in the response.
    - status (int, optional): HTTP status code.

    Returns:
    - JsonResponse: A Django JsonResponse object.
    """
    response_data = {
        'success': success,
        'message': message,
        'data': data
    }

    if user_info:
        response_data['user'] = user_info
    if session_info:
        response_data['session'] = session_info

    return JsonResponse(response_data, status=status)

def create_error_dict(msg):
    return {'ERROR':str(msg)}
