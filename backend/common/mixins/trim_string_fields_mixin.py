class TrimStringFieldsMixin:
    def validate(self, attrs):
        for field, value in attrs.items():
            if isinstance(value, str):
                attrs[field] = value.strip()
        return attrs
