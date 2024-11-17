from rest_framework_simplejwt.tokens import AccessToken


def get_payload(token):
    access_token = AccessToken(token)
    payload = access_token.payload
    return payload
