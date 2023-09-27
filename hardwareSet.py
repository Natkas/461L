class hardwareSet:
    def __init__(self):
        self.__capacity = 0
        self.__availability = 0
    def get_availability(self):
        return self.__availability
    def get_capacity(self):
        return self.__capacity
    def check_out(self, qty):
        if(self.__availability < qty):
            self.__availability = 0
            return -1
        self.__availability -= qty
        return 0
    def check_in(self,qty):
        self.__availability += qty
    def initialize_capacity(self, qty):
        self.__capacity = qty
        self.__availability = qty

